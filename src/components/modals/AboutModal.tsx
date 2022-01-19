import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import { logMyEvent } from "../../lib/settingsFirebase";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  if (isOpen) {
    logMyEvent("aboutModal");
    console.log("aboutModal opened");
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Informace o logické hře "}
        <Link href="https://hadejslova.cz">HádejSlova.cz</Link>.
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Aplikaci přeložil a pro české podmínky upravil{" "}
          <Link href="https://www.linkedin.com/in/tonda/">Tonda</Link>.{" "}
        </DialogContentText>{" "}
        <DialogContentText id="alert-dialog-description">
          Chyby a náměty na zlepšení hlašte:{" "}
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfMHytWem1XZZ6uLG3qP7IdBMKmSZ3LBNnjJPQ6M_LEi7_UVQ/viewform">
            zde
          </Link>
          . Můžete nás též sledovat na Twitteru{" "}
          <Link href="https://twitter.com/HadejSlova">@HadejSlova</Link>.
        </DialogContentText>{" "}
        <DialogContentText id="alert-dialog-description">
          Napsali o nás:{" "}
          <Link href="https://doupe.zive.cz/clanek/wordle-vas-nauci-hrat-si-se-slovy-ted-uz-i-cesky">
            Doupě
          </Link>
          ,{" "}
          <Link href="https://denikn.cz/789690/fenomen-wordle-proc-nas-bavi-divat-se-na-nudnou-stranku-a-cekat-na-nova-slova/">
            DeníkN
          </Link>
        </DialogContentText>
        <DialogContentText id="alert-dialog-description" sx={{ mt: 3 }}>
          Zdrojové kódy jsou:{" "}
          <Link href="https://github.com/tonyno/wordle">zde</Link>.
        </DialogContentText>{" "}
        <DialogContentText id="alert-dialog-description">
          Původní autorka zdrojových kódů:{" "}
          <Link href="https://github.com/hannahcode/wordle">hannahcode</Link>.
        </DialogContentText>{" "}
        <DialogContentText id="alert-dialog-description">
          Původní anglická verze hry:{" "}
          <Link href="https://www.powerlanguage.co.uk/wordle/">zde</Link>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Zavřít
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// export const AboutModal = ({ isOpen, handleClose }: Props) => {
//   return (
//     <Transition.Root show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed z-10 inset-0 overflow-y-auto"
//         onClose={handleClose}
//       >
//         <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//           </Transition.Child>

//           {/* This element is to trick the browser into centering the modal contents. */}
//           <span
//             className="hidden sm:inline-block sm:align-middle sm:h-screen"
//             aria-hidden="true"
//           >
//             &#8203;
//           </span>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             enterTo="opacity-100 translate-y-0 sm:scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//           >
//             <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
//               <div>
//                 <div className="text-center">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg leading-6 font-medium text-gray-900"
//                   >
//                     O této hře
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-500">
//                       Aplikaci přeložil a pro české podmínky upravil{" "}
//                       <a href="https://www.linkedin.com/in/tonda/">Tonda</a>.
//                       Zdrojové kódy jsou:{" "}
//                       <a
//                         href="https://github.com/tonyno/wordle"
//                         className="underline font-bold"
//                       >
//                         zde
//                       </a>
//                       .
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Hlášení případných chyb a námětů na vylepšení:{" "}
//                       <a
//                         href="https://github.com/tonyno/wordle/issues/new"
//                         className="underline font-bold"
//                       >
//                         zde
//                       </a>
//                       .
//                     </p>
//                     <p className="text-sm text-gray-500 mt-6">
//                       Původní autorka zdrojových kódů:{" "}
//                       <a
//                         href="https://github.com/hannahcode/wordle"
//                         className="underline font-bold"
//                       >
//                         hannahcode
//                       </a>
//                       . Původní anglická verze hry:{" "}
//                       <a
//                         href="https://www.powerlanguage.co.uk/wordle/"
//                         className="underline font-bold"
//                       >
//                         zde
//                       </a>
//                       .
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };
