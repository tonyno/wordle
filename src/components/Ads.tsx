import React, { useEffect } from "react";

type Props = {
  adClient: string;
  adSlot: string;
};

// see also https://www.dhiwise.com/post/the-ultimate-guide-to-monetizing-websites-with-react-adsense
// and https://gist.github.com/juliencrn/1b46e6536a225c7def9a3a03fa314e0a
const AdsenseComponent = ({ adClient, adSlot }: Props) => {
  useEffect(() => {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdsenseComponent;

/*

<!-- Test 1 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-9858251945255976"
     data-ad-slot="4677459022"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
*/
