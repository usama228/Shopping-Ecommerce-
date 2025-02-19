import { AppBar, ThemeProvider, useTheme } from "@mui/material";

import useSettings from "app/hooks/useSettings";




export default function Footer() {
  const theme = useTheme();
  const { settings } = useSettings();

  const footerTheme = settings.themes[settings.footer.theme] || theme;

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar color="primary" position="static" sx={{ zIndex: 96 }}>
        {/* <AppFooter>
          <FooterContent>
            <a href="https://ui-lib.com/downloads/matx-pro-react-admin/">
              <Button variant="contained" color="secondary">
                Get MatX Pro
              </Button>
            </a>

            <Span m="auto"></Span>

            <Paragraph m={0}>
              Design and Developed by <a href="http://ui-lib.com">UI Lib</a>
            </Paragraph>
          </FooterContent>
        </AppFooter> */}
      </AppBar>
    </ThemeProvider>
  );
}
