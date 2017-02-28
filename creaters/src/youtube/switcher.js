export function getSwitcher(el) {
    return (data) => {
        switch (data.data.type) {
            case "youtube_stop_view":
                el.className = "";
                el.innerHTML = "";
                break;
            case "youtube_view_now":
                el.className = "show"
                el.innerHTML = data.data.video.title;
                break;
            default:
                return;
        }
    };
}