module Stat {
    export function ProfileInstance(target:Object, key:string, descriptor:TypedPropertyDescriptor<{(): any}>) {
        let fn = descriptor ? descriptor.value : null;

        // Actual wrapping of the target method
        if (typeof fn === "function") {
            delete descriptor.value;
            delete descriptor.writable;

            // Using propertyDescriptor.get to get access to "this" (the object instance)
            descriptor.get = function () {
                // See if we have initialized the profiling
                if (!this.hasOwnProperty(key)) {
                    let profile = new CallProfile();

                    // Overwrite the property descriptor, so otherwise this[key] would go in infinite recursion
                    // - follwing https://github.com/mweststrate/MOBservable/blob/8cc7fc0e20c000db660037c8b5c9d944fe4155d9/mobservable.ts
                    Object.defineProperty(this, key, {
                        value: wrapWithProfiling(profile, fn),
                        writeable: false,
                        configurable: false,
                        enumberable: true
                    });
                }
                return this[key];
            }
        }
        return descriptor;
    }

    interface Profilable {
        (): any;
        // Define as optional(?) because I can't find a single statement to create Profilable
        profile?: CallProfile;
    }

    function wrapWithProfiling(profile:CallProfile, fn:() => any):Profilable {
        var v:Profilable = function (...args) {
            var delayed_error = null;
            var isFailed = false;
            let start = Date.now();

            try {
                fn.apply(this, args)
            } catch (error) {
                delayed_error = error;
                isFailed = true;
            }

            let end = Date.now();
            profile.addExecution(end - start, isFailed);

            if (delayed_error) {
                throw delayed_error;
            }
        };
        v.profile = profile;
        return v;
    }

    class CallProfile {
        private meanDuration:number;
        private count:number;
        private failedCount:number;

        constructor() {
            this.failedCount = 0;
            this.count = 0;
            this.meanDuration = 0;
        }

        addExecution(durationInMs:number, isFailed:boolean) {
            this.meanDuration += ((this.meanDuration * this.count) + durationInMs) / (this.count + 1);
            this.count += 1;
            if (isFailed) {
                this.failedCount += 1;
            }
        }
    }
}