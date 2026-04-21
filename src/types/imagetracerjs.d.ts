declare module 'imagetracerjs' {
    export interface Options {
        ltres?: number;
        qtres?: number;
        pathomit?: number;
        rightangleenhance?: boolean;
        colorsampling?: number;
        numberofcolors?: number;
        mincolorratio?: number;
        colorquantcycles?: number;
        scale?: number;
        simplifythreshold?: number;
        lcpr?: number;
        qcpr?: number;
        desc?: boolean;
        viewbox?: boolean;
        blurradius?: number;
        blurdelta?: number;
    }

    export function imageToSVG(
        url: string,
        callback: (svgString: string) => void,
        options?: Options
    ): void;

    const ImageTracer: {
        imageToSVG: typeof imageToSVG;
    };

    export default ImageTracer;
}