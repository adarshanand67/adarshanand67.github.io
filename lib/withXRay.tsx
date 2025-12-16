import React from 'react';
import { XRayWrapper } from '@/components/x-ray-wrapper';

export function withXRay<P extends object>(
    Component: React.ComponentType<P>,
    name: string,
    className: string = ''
) {
    const WrappedComponent = (props: P) => {
        return (
            <XRayWrapper name={name} className={className}>
                <Component {...props} />
            </XRayWrapper>
        );
    };

    WrappedComponent.displayName = `WithXRay(${name})`;
    return WrappedComponent;
}
