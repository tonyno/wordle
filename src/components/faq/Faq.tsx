import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box, Button, Grid, LinearProgress } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useGetFaq } from "../../lib/dataAdapter";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Faq() {
  const [faqData, faqLoading, faqError] = useGetFaq();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState<string | false>("panel0");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  if (faqError) {
    console.error(faqError);
  }

  faqData &&
    faqData.map((faq: any, indx: number) => {
      console.log(faq);
    });
  /*  const faqs = [
    [
      "Jaké slovní druhy se ve hře použávají?",
      "Hádané slovo může být podstatné jméno, přídavné jméno, zájmeno, číslovka nebo sloveso. Vždy je uvedeno v 1.osobě (neskloňované).",
    ],
    [
      "Proč mi hra hlásí, že slovo není ve slovníku?",
      "Hra obsahuje kombinaci několika volně dostupných českých slovníků. Aktuálně je v databázi kolem 20tis slov. Může se snadno stát, že některé slovo ve slovníku chybí a hra vám ho nedovolí zadat. Nezoufejte, ničemu to nevadí - aplikace vždy vybírá k hádání jen ta slova co ve slovníku jsou.",
    ],
  ];*/

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom component="div">
            Časté dotazy
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            Zpět na hru
          </Button>
        </Grid>
      </Grid>
      {faqLoading && <LinearProgress />}
      {faqData &&
        faqData.map((faq: any, indx: number) => (
          <Accordion
            expanded={expanded === "panel" + indx}
            onChange={handleChange("panel" + indx)}
            key={indx}
          >
            <AccordionSummary
              aria-controls={"panel-content" + indx}
              id={"panel-header" + indx}
            >
              <Typography>{faq?.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq?.description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
