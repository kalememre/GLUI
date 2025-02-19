import Link from "next/link";
import { Stack, styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <Image
          src="/images/logos/gl2.png"
          alt="logo"
          layout="intrinsic"
          height={70}
          width={180}
        />
      </Stack>
    </LinkStyled>
  );
};

export default Logo;
