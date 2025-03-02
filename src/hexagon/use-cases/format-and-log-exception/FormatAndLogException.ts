import { HttpException } from '@hexagon/exceptions/http/HttpException';
import { LogProvider } from '@hexagon/gateways/LogProvider';

export interface ExecuteData {
  path: string
  method: string
}

interface FormattedResponse {
  response: {
    status: number
    content: {
      type: string
      message: string
    }
  }
  className: string
}

export class FormatAndLogException {
  public constructor(
    private readonly _logProvider: LogProvider,
  ) { }

  /**
   * Formate la réponse JSON des erreurs .
   * @param data Données utile au log de l'erreur
   * @param error Exception
   */
  public execute(data: ExecuteData, error: Error) {
    let formattedResponse: FormattedResponse | undefined;
    if (error instanceof HttpException) {
      formattedResponse = this.returnHttpException(error);
    } else {
      formattedResponse = this.returnUnknownError(error);
    }

    this.logDetails(data, formattedResponse);
    return formattedResponse;
  }

  private returnHttpException(exception: HttpException) {
    return {
      response: {
        status: exception.status,
        content: exception.getResponse(),
      },
      className: exception.constructor.name,
    };
  }

  private returnUnknownError(error: Error) {
    return {
      response: {
        status: 500,
        content: {
          type: 'unknown_error',
          message: 'An error has occurred',
        },
      },
      className: error.name,
    };
  }

  private logDetails(data: ExecuteData, formattedException: FormattedResponse) {
    this._logProvider.error(`[${formattedException.response.status}] → ${data.method.toUpperCase()} ${data.path}`
    + `\n${JSON.stringify(formattedException.response, undefined, 2)}`);
  }
}
