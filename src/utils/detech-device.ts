/**
 * 检测是否是移动端设备
 */
export function isMobileDevice(): boolean {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
}

export function getElementOffset(el) {
    let width = el.clientWidth || 20;
    let height = el.clientHeight || 20;
    el = el.getBoundingClientRect();
    return {
        top: el.top + window.scrollY,
        left: el.left + window.scrollX,
        width: width,
        height: height
    };
}