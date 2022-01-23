import { Box, LinearProgress, Link, Typography } from "@mui/material";
import * as React from "react";
import { useGetFaq } from "../../lib/dataAdapter";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../muiStyled/AccordionStyled";
import PageTitle from "../statistics/PageTitle";

export default function Faq() {
  const [faqData, faqLoading, faqError] = useGetFaq();
  const [expanded, setExpanded] = React.useState<string | false>("panel0");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  if (faqError) {
    console.error(faqError);
  }

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
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <PageTitle title="Časté dotazy" />
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
      <Box component="main" sx={{ flexGrow: 1, pl: 2, pr: 2 }}>
        <Typography>
          Máte další dotaz nebo chcete nahlásit chybu? Použijte prosím{" "}
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfMHytWem1XZZ6uLG3qP7IdBMKmSZ3LBNnjJPQ6M_LEi7_UVQ/viewform">
            tento formulář.
          </Link>
        </Typography>
      </Box>
    </>
  );
}
