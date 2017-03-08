export function getSwitcher(el, poll) {
    return (data) => {
        switch (data.data.type) {
            case "new_message":
                poll.addMessage(data.data.message.full_render);
                break;
            default:
                return;
        }
    };
}