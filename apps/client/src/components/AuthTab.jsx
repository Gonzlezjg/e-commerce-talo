import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AuthForm from './AuthForm';

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function AuthTab() {
  const [valueTab, setValueTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  
  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Tabs value={valueTab} onChange={handleChange}>
          <Tab label="Inicia sesión" />
          <Tab label="Registrate" />
        </Tabs>
      </Box>
      <CustomTabPanel value={valueTab} index={0}>
        <AuthForm formMode={'login'} />
      </CustomTabPanel>
      <CustomTabPanel value={valueTab} index={1}>
        <AuthForm formMode={'signup'} />
      </CustomTabPanel>
    </Box>
  );
}
