import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import Grid from '@mui/material/Unstable_Grid2';
import {styled} from "@mui/material/styles";
import {
    FormControl,
    FormHelperText,
    Input,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField
} from "@mui/material"; // Grid version 2
import {TaxBracket} from "../src/models/Models";
import Button from "@mui/material/Button";
import {useState} from "react";
import { NumericFormatCustom } from '../src/helpers/NumericFormat';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const wozYearValues: Record<string, number> = {
    "2023": 0.45,
    "2022": 0.35,
}

const deductibleInterest: Record<TaxBracket, number> = {
    "1": 0.3703,
    "2": 0.4
}

const calculateDeductiblePossibleAmount = (wozValue: number, mortgageInterest: number, year: string): number => {
    return mortgageInterest - (wozValue * wozYearValues[year]);
}

const calculateDeductibleInterest = (deductibleAmount: number, taxBracket: TaxBracket, year: string): number => {
   if (year === "2022") {
       return deductibleAmount * deductibleInterest[taxBracket];
   }
   return deductibleAmount * 0.37;
}
export default function Home() {
    const [anualSalary, setAnualSalary] = useState(0);
    const [wozValue, setWozValue] = useState(0);
    const [anualIncome, setAnualIncome] = useState(0);
    return (
    <Container maxWidth="lg">
      {/*<Box*/}
      {/*  sx={{*/}
      {/*    my: 50,*/}
      {/*      width: 1,*/}
      {/*    display: 'flex',*/}
      {/*    flexDirection: 'column',*/}
      {/*    justifyContent: 'center',*/}
      {/*    alignItems: 'center',*/}
      {/*  }}*/}
      {/*>*/}
          <Grid container spacing={2}>
              <Grid xs={12}>
                  <Box sx={{ textAlign: 'center', m: 1 }}>Dutch mortgage interest deduction calculator</Box>
              </Grid>
              {/*<FormControl>*/}
              <Grid xs={12}>
                  <TextField
                      id="anual-salary"
                      label="Anual Salary"
                      onChange={(e) => setAnualSalary(Number(e.target.value))}
                      InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          inputComponent: NumericFormatCustom as any,
                      }}
                      fullWidth
                  />
              </Grid>
              <Grid xs={4}>
                  <TextField
                      id="anual-income"
                      label="Anual Income"
                      onChange={(e) => setAnualIncome(Number(e.target.value))}
                      InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          inputComponent: NumericFormatCustom as any,
                      }}
                      type="number"
                  />
              </Grid>
              <Grid xs={4}>
                  <TextField
                      id="woz-value"
                      label="WOZ Value of house"
                      onChange={(e) => setWozValue(Number(e.target.value))}
                      InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          inputComponent: NumericFormatCustom as any,
                      }}
                      type="number"
                  />
              </Grid>
              <Grid xs={4}>
                  <Button variant="outlined">Calculate</Button>
              </Grid>
              <Grid xs={4}>
                  <Paper>
                      WozValue: {wozValue}
                      AnualIncome: {anualIncome}
                      AnualSalary: {anualSalary}
                  </Paper>
              </Grid>
              {/*</FormControl>*/}
          </Grid>
      {/*</Box>*/}
    </Container>
  );
}


