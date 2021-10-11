import {createTheme} from "@mui/material";

export const theme = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true
            }
        },
        MuiButton: {
            styleOverrides: {
                text: {
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    },
                },
                contained: {
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow: "none",

                },
                containedPrimary: {
                    backgroundColor: '#fff',
                    boxShadow: "none",

                    '&:hover': {
                        boxShadow: "none",
                        backgroundColor: '#fff',
                    },
                }
            }
        }
    },
})