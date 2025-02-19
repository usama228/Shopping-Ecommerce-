import {
  Box,
  Card,
  Table,
  Select,
  styled,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead
} from "@mui/material";

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between"
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize"
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" }
}));



export default function TopSellingTable() {
  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>top selling products</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
            <TableCell colSpan={2} sx={{ px: 3 }}>
                Picture
              </TableCell>
              <TableCell colSpan={2} sx={{ px: 3 }}>
                Title
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 3 }}>
                Description
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 3 }}>
                Price
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 3 }}>
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={2}  sx={{ px: 3, textTransform: "capitalize" }}>
                  Pic
                </TableCell>

                <TableCell  colSpan={2} sx={{ px: 3, textTransform: "capitalize" }}>
                 Title
                </TableCell>

                <TableCell sx={{ px: 3 }} colSpan={2}>
                  Description
                </TableCell>

                <TableCell sx={{ px: 3 }} colSpan={2}>
                 Price
                </TableCell>
                <TableCell sx={{ px: 3 }} colSpan={2}>
                 Quantity
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
}

const productList = [
  {
    imgUrl: "/assets/images/products/headphone-2.jpg",
    name: "earphone",
    price: 100,
    available: 15
  },
  {
    imgUrl: "/assets/images/products/headphone-3.jpg",
    name: "earphone",
    price: 1500,
    available: 30
  },
  {
    imgUrl: "/assets/images/products/iphone-2.jpg",
    name: "iPhone x",
    price: 1900,
    available: 35
  },
  {
    imgUrl: "/assets/images/products/iphone-1.jpg",
    name: "iPhone x",
    price: 100,
    available: 0
  },
  {
    imgUrl: "/assets/images/products/headphone-3.jpg",
    name: "Head phone",
    price: 1190,
    available: 5
  }
];
