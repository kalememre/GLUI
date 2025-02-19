import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SvgIconComponent } from "@mui/icons-material";

interface UserCountCardProps {
  title: string;
  icon: SvgIconComponent;
  count: number;
  index: number;
}

const UserCountCard: React.FC<UserCountCardProps> = ({ title, icon: IconComponent, count, index }) => {
  return (
    <Card key={index} sx={{ padding: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap:4,justifyItems:"left" }}>
        <Box 
          sx={{ 
            bgcolor: "primary.main", 
            borderRadius: 20,
            width: 100,
            height: 100,
            minWidth:100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <IconComponent 
          sx={{ color: "white",
                fontSize: 50
           }}
            />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="end" gap={3} sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight="bold" fontSize={50}>
            {count}
          </Typography>
          <Typography variant="h6" color="text.secondary" noWrap>
            {title}
          </Typography>
          
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCountCard;