type AnalyticsEvent = {
    name: string;
    properties?: Record<string, string | number | boolean>;
};
class Analytics {
    private enabled: boolean;
    constructor() {
        this.enabled = false;
    }
    pageView(url: string) {
        if (!this.enabled) return;
        if (typeof window !== 'undefined' && (window as any).plausible) {
            (window as any).plausible('pageview', { props: { url } });
        }
        if (typeof window !== 'undefined' && (window as any).umami) {
            (window as any).umami.track({ url });
        }
    }
    event(event: AnalyticsEvent) {
        if (!this.enabled) return;
        if (typeof window !== 'undefined' && (window as any).plausible) {
            (window as any).plausible(event.name, { props: event.properties });
        }
        if (typeof window !== 'undefined' && (window as any).umami) {
            (window as any).umami.track(event.name, event.properties);
        }
    }
    click(element: string, properties?: Record<string, string | number | boolean>) {
        this.event({
            name: 'click',
            properties: { element, ...properties },
        });
    }
    submit(form: string, properties?: Record<string, string | number | boolean>) {
        this.event({
            name: 'submit',
            properties: { form, ...properties },
        });
    }
}
export const analytics = new Analytics();
