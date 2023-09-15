import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper mt="2rem">
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://www.ivykids.com/wp-content/uploads/2022/06/IMG_2849-455x340.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>IVY KIDS</Typography>
        <Typography color={medium}>www.ivykids.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Looking for the best preschool and educational daycare? Ivy Kids helps
        your child to grow to their fullest potential. Schedule a tour of our
        schools today!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
