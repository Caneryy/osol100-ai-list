import axios from 'axios';
import { Coin } from '../types/coin';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
export const COIN_IDS = [
'ai16z',
'fartcoin',
'grass',
'goatseus-maximus',
'io-net',
'act-i-the-ai-prophecy',
'zerebro',
'nosana',
'griffain',
'tars-protocol',
'ai-rig-complex',
'eliza',
'alchemist-ai',
'memes-ai',
'degen-spartan-ai',
'dasha',
'dolos-the-bully',
'kween',
'orbit-2',
'fxn',
'top-hat',
'shoggoth',
'agenttank',
'deep-worm',
'big-pharmai',
'bongo-cat',
'numogram',
'ava-ai',
'opus-2',
'obot',
'project89',
'chaos-and-disorder',
'meow-2',
'koala-ai',
'kitten-haimer',
'pippin',
'max-2',
'aimonica-brands',
'autonomous-virtual-beings',
'forest',
'solaris-ai',
'synesis-one',
'moe-4',
'universal-basic-compute',
'mizuki',
'naitzsche',
'slopfather',
'the-lokie-cabal',
'tensor',
'arok-vc',
'aiwithdaddyissues',
'bloomsperg-terminal',
'omega-2',
'thales-ai',
'keke-terminal',
'horny',
'quasar-2',
'ropirito',
'kolin',
'kwantxbt',
'dither',
'duck-ai',
'centience',
'iq6900',
'darksun',
'weird-medieval-memes',
'yousim',
'sensus',
'ocada-ai',
'singularry',
'naval-ai',
'kira-2',
'kirakuru',
'brot',
'effective-accelerationism',
'cheshire-grin',
'limbo',
'size',
'neroboss',
'gmika',
'kira-3',
'convo',
'sqrfund',
'ugly-dog',
'gemxbt',
'roastmaster9000',
'nova-on-mars',
'sendor',
'flowerai',
'dojo-protocol',
'internosaur',
'devin',
'lea-ai',
'rex-3',
'aletheia',
'mona-arcane',
'apicoin',
'cyphomancer',
'lucy-ai',
'agent-rogue'
].join(',');

const api = axios.create({
  baseURL: COINGECKO_API,
});

export const getCoins = async (): Promise<Coin[]> => {
  const { data } = await api.get<Coin[]>(
    `/coins/markets?vs_currency=usd&ids=${COIN_IDS}&order=market_cap_desc&sparkline=false`
  );
  return data.map(coin => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    image: coin.image,
    current_price: coin.current_price || 0,
    market_cap: coin.market_cap || 0,
    market_cap_rank: coin.market_cap_rank || 0,
    price_change_percentage_24h: coin.price_change_percentage_24h || 0,
    total_volume: coin.total_volume || 0,
  }));
};

export const fetchMultipleCoinsHistory = async (
  coinIds: string[],
  days: number = 7
): Promise<Record<string, number[]>> => {
  const promises = coinIds.map(id =>
    axios.get(`${COINGECKO_API}/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
        interval: 'daily'
      }
    })
  );

  try {
    const responses = await Promise.all(promises);
    const priceData: Record<string, number[]> = {};
    
    responses.forEach((response, index) => {
      const prices = response.data.prices.map((price: number[]) => price[1]);
      priceData[coinIds[index]] = prices;
    });

    return priceData;
  } catch (error) {
    console.error('Error fetching multiple coins history:', error);
    throw error;
  }
};

export const calculatePriceChanges = (
  priceData: Record<string, number[]>
): Array<{ id: string; data: Array<{ x: string; y: number }> }> => {
  const result = [];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  for (const [coinId, prices] of Object.entries(priceData)) {
    const dailyChanges = prices.slice(1).map((price, index) => {
      const previousPrice = prices[index];
      return (price - previousPrice) / previousPrice;
    });

    result.push({
      id: coinId,
      data: dailyChanges.map((change, index) => ({
        x: dates[index + 1],
        y: change
      }))
    });
  }

  return result;
};