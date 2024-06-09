import {
    useSnackbar,
    OptionsObject,
    SnackbarKey,
    SnackbarMessage,
} from "notistack"

let useSnackbarRef: ReturnType<typeof useSnackbar>

export const SnackbarUtilsConfigurator = (): null => {
    useSnackbarRef = useSnackbar()
    return null
}

const toast = (
    msg: SnackbarMessage,
    variant: OptionsObject["variant"] = "default"
) => {
    useSnackbarRef.enqueueSnackbar(msg, {
        variant,
        autoHideDuration: 3000,
    })
}

const Snackbar = {
    success(msg: string) {
        toast(msg, "success")
    },
    warning(msg: string) {
        toast(msg, "warning")
    },
    info(msg: string) {
        toast(msg, "info")
    },
    error(msg: string) {
        toast(msg, "error")
    },
    toast,
}

export default Snackbar
