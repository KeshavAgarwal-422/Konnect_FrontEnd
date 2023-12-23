import { Link, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import image from "../../Images/0CC5BF92-E723-46BD-AF38-FDF14BBDF7E2.png";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper mt="2rem">
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={image}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <Typography color={medium} m="0.5rem 0">
        This website is developed by Keshav Agarwal, a full-stack web developer.
      </Typography>
      <Typography color={medium} m="1rem 0">
        Contact:{" "}
        <Link
          underline="always"
          color={main}
          href="mailto:keshav.agarwal42222@gmail.com"
        >
          keshav.agarwal42222@gmail.com
        </Link>
      </Typography>
      <Typography color={medium} m="1rem 0">
        Portfolio:{" "}
        <Link
          color={main}
          href="https://keshavagarwal-portfolio.web.app/"
          target="_blank"
          rel="noopener noreferrer"
          underline="always"
        >
          https://keshavagarwal-portfolio.web.app/
        </Link>
      </Typography>
    </WidgetWrapper>
  );
};
export default AdvertWidget;
