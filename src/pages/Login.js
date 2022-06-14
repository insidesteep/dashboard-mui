import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  Card,
  Link,
  Container,
  Typography,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Page from "../components/Page";
import Logo from "../components/Logo";
// sections
import { LoginForm } from "../sections/auth/login";
import AuthSocial from "../sections/auth/AuthSocial";
import { Snackbar } from "@material-ui/core";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { error, loading } = useSelector((state) => state.auth);

  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        
      >
        <CircularProgress color="inherit" title="222"/>
      </Backdrop>
    );
  }

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Добро пожаловать
            </Typography>
            <img
              src="/static/illustrations/illustration_login.png"
              alt="login"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Авторизация
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Авторизуйтесь, что-бы войти в систему
            </Typography>

            {/* <AuthSocial /> */}

            <LoginForm />

            <Snackbar
              open={error.status}
              message="www"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert severity="error">{error.message}</Alert>
            </Snackbar>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
