import * as React from 'react';
import {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {styled} from "@mui/material/styles";
import {InputAdornment, Paper, TextField} from "@mui/material"; // Grid version 2
import {TaxBracket} from "../src/models/Models";
import Button from "@mui/material/Button";
import {NumericFormatCustom} from '../src/helpers/NumericFormat';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const wozYearValues: Record<string, number> = {
    "2023": 0.0045,
    "2022": 0.0035,
}

const deductibleInterest: Record<TaxBracket, number> = {
    "1": 0.3703,
    "2": 0.4
}

const calculateDeductiblePossibleAmount = (wozValue: number, mortgageAmount: number): number => {
    return mortgageAmount - (wozValue * 0.0035);
}

const calculateDeductibleInterest = (deductibleAmount: number): number => {
    // if (year === "2022") {
    //     return deductibleAmount * deductibleInterest[taxBracket];
    // }
    return deductibleAmount * 0.37;
}


function calculateMortgageInterestYear(mortgageAmount: number, mortgageInterestRate: number) {
    return mortgageAmount * mortgageInterestRate / 100;
}

export default function Home() {
    const [anualSalary, setAnualSalary] = useState(0);
    const [wozValue, setWozValue] = useState(0);
    const [mortgageAmount, setMortgageAmount] = useState(0);
    const [deductibleInterest, setDeductibleInterest] = useState(0);
    const [mortgageInterestRate, setMortgageInterestRate] = useState(0);
    const [deductibleInterestPerYear, setDeductibleInterestPerYear] = useState(0);


    useEffect(() => {
        console.log(deductibleInterestPerYear)
    }, [deductibleInterestPerYear]);


    function calculateDeductibleInterestFromEvent(event: any) {
        let mortageInterestYearly = calculateMortgageInterestYear(mortgageAmount, mortgageInterestRate);
        console.log(mortageInterestYearly)
        const calculatedDeductiblePossibleAmount = calculateDeductiblePossibleAmount(wozValue, mortageInterestYearly);
        console.log(`Calculated deductible possible value: ${calculatedDeductiblePossibleAmount}`)
        const calculatedDeductibleInterestYear = calculateDeductibleInterest(calculatedDeductiblePossibleAmount);
        console.log("Deductable amount "+calculatedDeductibleInterestYear)
        setDeductibleInterestPerYear(calculatedDeductibleInterestYear);
    }


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
            <Paper
                elevation={12}
                sx={{
                    margin: 2,
                    padding: 2,
                }}
            >
                <Grid container spacing={3}>
                    <Grid xs={12}>
                        <Box sx={{textAlign: 'center', m: 1}}>Dutch mortgage interest deduction calculator</Box>
                    </Grid>
                    {/*<FormControl>*/}
                    <Grid xs={6}>
                        <TextField
                            id="anual-salary"
                            label="Anual Salary"
                            onChange={(e) => setAnualSalary(Number(e.target.value))}
                            InputProps={{
                                inputComponent: NumericFormatCustom as any,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            id="mortgage-interest-rate"
                            label="Mortgage Interest Rate"
                            onChange={(e) => setMortgageInterestRate(Number(e.target.value))}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                inputComponent: NumericFormatCustom as any,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            id="mortage-amount"
                            label="Mortgage Amount"
                            onChange={(e) => setMortgageAmount(Number(e.target.value))}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                inputComponent: NumericFormatCustom as any,
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            id="woz-value"
                            label="WOZ Value of House"
                            onChange={(e) => setWozValue(Number(e.target.value))}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                inputComponent: NumericFormatCustom as any,
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <Button variant="outlined"
                                color="primary"
                                onClick={calculateDeductibleInterestFromEvent}
                        >Calculate</Button>
                    </Grid>
                    <Grid xs={12}>
                        <Paper>
                            Deductible Interest for that year: {deductibleInterestPerYear}
                        </Paper>
                    </Grid>
                    {/*</FormControl>*/}
                </Grid>
            </Paper>
            {/*</Box>*/}
        </Container>
    );
}


