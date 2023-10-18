import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardResume from './CardResume';
import { useSelector } from 'react-redux';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const steps = ['Carrito', 'Entrega', 'Pago'];

export default function ResumeStepper() {
  const cartProducts = useSelector((state) => state.cart.products);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [totalTaloPrice, setTotalTaloPrice] = useState(0);

  function sumTotalTaloPrice(arr) {
    return arr.reduce((total, producto) => {
      if (producto.totalTaloPrice) {
        return total + producto.totalTaloPrice;
      } else if (producto.quantity && producto.taloPrice) {
        return total + producto.quantity * producto.taloPrice;
      }
      return total;
    }, 0);
  }
  useEffect(() => {
    setTotalTaloPrice(sumTotalTaloPrice(cartProducts));
  }, [cartProducts]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  if (cartProducts.length === 0) {
    return <>{'Sin datos'}</>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel color="inherit">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 10 }}>
                <Box component="div" sx={{ width: '100%' }}>
                  <Typography
                    fontFamily={'Roboto'}
                    variant="p"
                    sx={{ mt: 2, mb: 2, py: 1 }}
                  >
                    Carrito de compras
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                    }}
                  >
                    {cartProducts.length > 0 &&
                      cartProducts.map((data, key) => (
                        <CardResume data={data} key={key} />
                      ))}
                  </Box>
                </Box>
                {cartProducts.length > 0 && (
                  <Box
                    sx={{
                      width: '50%',
                      maxHeight: 250,
                    }}
                  >
                    <Paper
                      sx={{
                        height: '100%',
                        p: 4,
                      }}
                    >
                      <Typography
                        fontWeight="bold"
                        fontFamily="Roboto"
                        variant="p"
                        sx={{
                          py: 4,
                          mb: 2,
                        }}
                      >
                        Resumen del pedido
                      </Typography>
                      <Divider />
                      <Grid
                        alignItems="center"
                        direction="row"
                        container
                        sx={{ mt: 4 }}
                      >
                        <Grid display={'flex'} item xs={12}>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%' }}
                          />
                          <Button variant="outlined">Aplicar</Button>
                        </Grid>
                      </Grid>
                      <Grid
                        alignItems="center"
                        direction="row"
                        container
                        sx={{ mt: 2 }}
                      >
                        <Grid item xs={4}>
                          <Typography
                            fontFamily="Roboto"
                            variant="p"
                            sx={{
                              py: 4,
                              mb: 2,
                            }}
                          >
                            Materiales
                          </Typography>
                          <HelpOutlineIcon color="primary" />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            fontFamily="Roboto"
                            variant="p"
                            sx={{
                              py: 4,
                              mb: 2,
                              textAlign: 'center',
                            }}
                          >
                            $
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            fontFamily="Roboto"
                            variant="p"
                            sx={{
                              py: 4,
                              mb: 2,
                            }}
                          >
                            {cartProducts.length}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        alignItems="center"
                        direction="row"
                        container
                        sx={{ mt: 2 }}
                      >
                        <Grid item xs={4}>
                          <Typography
                            fontFamily="Roboto"
                            variant="p"
                            fontWeight="bold"
                            sx={{
                              py: 4,
                              mb: 2,
                            }}
                          >
                            Total
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            fontFamily="Roboto"
                            variant="p"
                            sx={{
                              py: 4,
                              mb: 2,
                              textAlign: 'center',
                            }}
                          >
                            $
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            fontFamily="Roboto"
                            variant="p"
                            fontWeight="bold"
                            sx={{
                              py: 4,
                              mb: 2,
                              textAlign: 'center',
                            }}
                          >
                            {totalTaloPrice}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        alignItems="center"
                        direction="row"
                        container
                        sx={{ mt: 4 }}
                      >
                        <Grid item xs={12}>
                          <Button variant="outlined" sx={{ width: '100%' }}>
                            continuar
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                )}
              </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: 'inline-block' }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
