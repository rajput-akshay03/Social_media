import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../styles/FlexBetween";
import WidgetWrapper from "../styles/widgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        src="https://www.mrftyres.com/images/banner-five.jpg"
        alt="advert"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MRF</Typography>
        <Typography color={medium}>mrfzlx.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your path is very hard, make it fast and smooth.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;