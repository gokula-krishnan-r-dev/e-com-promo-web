declare module "html2pdf.js" {
  type Html2PdfOptions = {
    margin?: number;
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale: number };
    jsPDF?: { unit: string; format: string; orientation: string };
  };

  function html2pdf(): {
    set: (options: Html2PdfOptions) => {
      from: (element: HTMLElement) => {
        then(arg0: (pdf: any) => void): unknown;
        save: () => void;
      };
    };
  };

  export = html2pdf;
}
