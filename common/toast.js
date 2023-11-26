function toast(text, type) {
    let color;

    if (type == "error") {
        color="rgba(214, 83, 65, 1)"
    } else if (type == "success") {
        color="rgba(40, 167, 69, 1)"
    } else if (type == "warning") {
        color="rgba(237, 153, 29, 1)"
    }

    Toastify({
        text,
        style: {
            borderRadius: "5px",
            background: color,
            boxShadow: "none"
        },
        duration: 8000
    }).showToast()
    
}