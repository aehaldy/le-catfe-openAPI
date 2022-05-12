import React from 'react';
import catMug from './catMug.png'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { CssBaseline } from '@mui/material';
import { Menu } from './components/Menu';
import { Cats } from './components/CatsPage/Cats'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', 
        bgcolor: '#9d6a89', marginTop: 10, position: 'relative', 
        paddingTop: "50px", marginBottom: 18}}>
        <div style={{
          position: 'absolute', 
          paddingTop: "1px",
          paddingLeft: "1px",
          top: -78,
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '310px',
          height: '310px',
          borderRadius: 310,
          border: '5px dashed #725d68'
        }}>
          <div style={{
            paddingTop: "10px",
            width: '298px',
            height: '298px',
            borderRadius: 298,
            backgroundColor: "#725d68",
            color: '#f5d8c5',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'cursive',
            fontSize: '3em',
            }}>
              <div>le Catfé</div>
              <img src={catMug} alt="cat mug" style={{width: 150}}/>
          </div>
        </div>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs" 
          indicatorColor="secondary" variant="fullWidth" textColor="secondary"
        >
          <Tab label="Menu" {...a11yProps(0)} />
          <Tab label="Events" {...a11yProps(1)} />
          <Tab label="" disabled/>
          <Tab label="Cats" {...a11yProps(3)} />
          <Tab label="Account" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Menu />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Events
      </TabPanel>
      <TabPanel value={value} index={2}>
        Void
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Cats />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Sign In
      </TabPanel>
    </ThemeProvider>
  );
}

export default App;
