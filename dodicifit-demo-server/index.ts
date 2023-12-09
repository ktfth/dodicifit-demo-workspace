import cors from 'https://deno.land/x/edge_cors/src/cors.ts';
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';

interface IResponsePayload {
  error: boolean;
  success: boolean;
  message: string;
  result: object;
}

const respondWithJson = (
    request: Request,
    payload: IResponsePayload = { error: false, success: false, message: '', result: {} },
    status: number = 200,
    headers: object = {
        'Content-Type': 'application/json'
    }
) => {
    return cors(request, new Response(JSON.stringify(payload, null, null, 2), {
        status,
        headers,
    }))
};

const handler = async (request: Request): Promise<Response> => {
  // Generate a function to produce funny quotes in portuguese
  const randomQuote = () => {
    const quotes = [
      'A vida é como um saco de batatas: você nunca sabe o que vai tirar.',
      'O humor é como o queijo: quanto mais velho, melhor.',
      'O amor é como um elefante: é difícil de esconder, mas é fácil de fazer uma bagunça.',
      'A esperança é como um guarda-chuva: é melhor ter e não precisar do que precisar e não ter.',
      'A vida é como um jogo de cartas: você só pode jogar com as cartas que tem.',
      'O português é uma língua tão bonita que até os erros são engraçados.',
      'O futebol brasileiro é como uma novela: tem drama, suspense e sempre tem um final feliz.',
      'O churrasco brasileiro é uma experiência religiosa.',
      'O carnaval brasileiro é a maior festa do mundo.',
      'O Brasil é um país de contrastes: tem belezas naturais incríveis, mas também tem muita desigualdade social.' 
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);

    return quotes[randomIndex];
  };

  const randomQuotePayload = {
    error: false,
    success: true,
    message: 'Random quote generated successfully!',
    result: {
      quote: randomQuote(),
    },
  };

  return respondWithJson(request, randomQuotePayload);
};

serve(handler);
