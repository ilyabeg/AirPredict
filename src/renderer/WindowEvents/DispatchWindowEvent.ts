import CustomWindowEvents from "./CustomWindowEvents";

export default function dispatchWindowEvent<T extends keyof CustomWindowEvents>(
    method: T,
    params: CustomWindowEvents[T]
) {
    const customEvent = new CustomEvent(method, { detail: params });
    window.dispatchEvent(customEvent);
}