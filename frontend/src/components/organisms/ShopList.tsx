import {
  Typography,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  RamenDiningOutlined,
  LocalPizzaOutlined,
  LunchDiningOutlined,
} from "../atoms";

export const ShopList = () => {
  return (
    <>
      <Typography variant="h5" component="h2" sx={{ py: 2 }}>
        Shops:
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemAvatar>
            <Avatar>
              <RamenDiningOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemButton>
            <ListItemText primary="Iconic Sushi" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemAvatar>
            <Avatar>
              <LunchDiningOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemButton>
            <ListItemText primary="McDon" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemAvatar>
            <Avatar>
              <LocalPizzaOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemButton>
            <ListItemText primary="Rocci Pizza" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default ShopList;
