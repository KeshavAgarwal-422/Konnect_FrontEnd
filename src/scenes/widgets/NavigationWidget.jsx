import { Box, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import {
  HomeOutlined,
  PersonOutlineOutlined,
  RepeatOutlined,
} from "@mui/icons-material";
import Groups2Icon from "@mui/icons-material/Groups2";
import Navigation from "components/Navigation";
import { useState } from "react";

const NavigationWidget = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("/home");
  const NavigationItems = [
    { icon: <HomeOutlined />, text: "Home", route: "/home" },
    { icon: <RepeatOutlined />, text: "Tweets", route: "/tweet" },
  ];

  const handleTabClick = (route) => {
    setActiveTab(route);
  };

  return (
    <WidgetWrapper
      sx={{
        paddingBottom: "2rem",
      }}
    >
      <Groups2Icon
        style={{
          fontSize: "36px",
          color: theme.palette.primary.main,
          marginLeft: "15%",
          marginBottom: "1rem",
        }}
      />
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {NavigationItems?.map?.((item, i) => (
          <Navigation
            key={i}
            icon={item.icon}
            text={item.text}
            route={item.route}
            active={item.route === activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default NavigationWidget;
