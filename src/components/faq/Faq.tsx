import { Box, LinearProgress, Link, Typography } from "@mui/material";
import * as React from "react";
import { FaqType, useGetFaq } from "../../lib/dataAdapter";
import MyAlert from "../alerts/MyAlert";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../muiStyled/AccordionStyled";
import PageTitle from "../statistics/PageTitle";
import styles from "./Faq.module.css";
//import "./Faq.module.css";

export default function Faq() {
  const [faqData, faqLoading, faqError] = useGetFaq();
  const [expanded, setExpanded] = React.useState<string | false>("panel0");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  let errorMessage: string = "";
  if (faqError) {
    console.error(faqError);
    errorMessage =
      "Nepodařilo se načíst FAQ. Ujistěte se, že máte funkční připojení k internetu. Chyba: " +
      faqError.message;
  }
  if (!faqLoading && faqData && !faqData.items[0].title) {
    errorMessage =
      "Nepodařilo se správně načíst FAQ. Zkuste to prosím později.";
  }
  if (errorMessage) {
    return <MyAlert message={errorMessage} variant="error" />;
  }

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <PageTitle title="Časté dotazy" />
        {faqLoading && <LinearProgress />}

        {faqData &&
          faqData?.items.map((faq: FaqType, indx: number) => (
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
                {/*<Typography>{faq?.description}</Typography>*/}
                <div
                  dangerouslySetInnerHTML={{ __html: faq?.description }}
                  className={styles.Faq}
                />
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
