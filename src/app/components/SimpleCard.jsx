import { Box } from "@mui/material";
import { CardRoot, CardTitle } from "app/assets";
export default function SimpleCard({ children, title, subtitle }) {
  return (
    <CardRoot elevation={6}>
      <CardTitle subtitle={subtitle}>{title}</CardTitle>
      {subtitle && <Box mb={2}>{subtitle}</Box>}
      {children}
    </CardRoot>
  );
}
