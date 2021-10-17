import {createTheme} from "@mui/material";

export const theme = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            }
        },
        MuiButton: {
            defaultProps: {
              color: "inherit"
            },
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
                text: {
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    },
                },
                contained: {
                    backgroundColor: '#fff',
                    '&:hover': {
                        backgroundColor: '#fff',
                    },
                },
                containedPrimary: {
                    backgroundColor: '#4683d9',

                    '&:hover': {
                        boxShadow: "none",
                        backgroundColor: '#437CCE',
                    },
                },

            }
        }
    },
})