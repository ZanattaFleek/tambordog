import { DateTime } from "luxon";

export default class ClsFormatacao {
  public telefone ( numero: string ): null | string {

    let cleaned = ( "" + numero ).replace( /\D/g, "" );

    let mascara: RegExp =
      cleaned.length === 11 ?
        /^(\d{0,2})?(\d{0,5})?(\d{0,4})?$/ :
        /^(\d{0,2})?(\d{0,4})?(\d{0,4})?$/

    let match = cleaned.match( mascara );

    if ( match && [10, 11].includes( cleaned.length ) ) {

      return [
        match[1] ? "(" : "",
        match[1],
        match[1] ? ") " : "",
        match[2],
        match[3] ? "-" : "",
        match[3],
      ].join( "" );

    } else {

      return null

    }

  }

  /** Converte yyyy-MM-dd para dd/MM/yyyy */
  public dataISOtoUser ( data: string ): string {
    return DateTime.fromFormat( data, 'yyyy-MM-dd' ).toFormat( 'dd/MM/yyyy' )
  }

  public currency ( numero: number ): string {
    return numero.toLocaleString( 'pt-br', { minimumFractionDigits: 2 } )
  }

  public dataAbreviadaParaDataCompleta ( dataAbreviada: string ): string {
    return dataAbreviada.concat( '/' ).concat( DateTime.now().toFormat( 'yyyy' ) )
  }
}