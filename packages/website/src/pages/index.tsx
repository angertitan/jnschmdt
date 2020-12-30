import axios from 'axios';

const DEFAULT_GREETING = 'Hallo!';
const DEFAULT_FLAG = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-de" viewBox="0 0 640 480">
											<path fill="#ffce00" d="M0 320h640v160H0z"/>
											<path d="M0 0h640v160H0z"/>
											<path fill="#d00" d="M0 160h640v160H0z"/>
											</svg>`;
const AVAIABLE_LANG = [
	{ flagID: 'ba', translatorID: 'bs' },
	{ flagID: 'bg', translatorID: 'bg' },
	{ flagID: 'cn', translatorID: 'zh-Hans' },
	{ flagID: 'hr', translatorID: 'hr' },
	{ flagID: 'cz', translatorID: 'cs' },
	{ flagID: 'dk', translatorID: 'da' },
	{ flagID: 'nl', translatorID: 'nl' },
	{ flagID: 'en', translatorID: 'en' },
	{ flagID: 'ee', translatorID: 'et' },
	{ flagID: 'fi', translatorID: 'fi' },
	{ flagID: 'fr', translatorID: 'fr' },
	{ flagID: 'de', translatorID: 'de' },
	{ flagID: 'gr', translatorID: 'el' },
	{ flagID: 'hu', translatorID: 'hu' },
	{ flagID: 'is', translatorID: 'is' },
	{ flagID: 'id', translatorID: 'id' },
	{ flagID: 'ie', translatorID: 'ga' },
	{ flagID: 'it', translatorID: 'it' },
	{ flagID: 'jp', translatorID: 'ja' },
	{ flagID: 'kr', translatorID: 'ko' },
	{ flagID: 'lv', translatorID: 'lv' },
	{ flagID: 'lt', translatorID: 'lt' },
	{ flagID: 'mg', translatorID: 'mg' },
	{ flagID: 'my', translatorID: 'ms' },
	{ flagID: 'mt', translatorID: 'mt' },
	{ flagID: 'no', translatorID: 'nb' },
	{ flagID: 'pl', translatorID: 'pl' },
	{ flagID: 'pt', translatorID: 'pt-pt' },
	{ flagID: 'pa', translatorID: 'pa' },
	{ flagID: 'ro', translatorID: 'ro' },
	{ flagID: 'ru', translatorID: 'ru' },
	{ flagID: 'rs', translatorID: 'sr-Cyrl' },
	{ flagID: 'sk', translatorID: 'sk' },
	{ flagID: 'si', translatorID: 'sl' },
	{ flagID: 'es', translatorID: 'es' },
	{ flagID: 'se', translatorID: 'sv' },
	{ flagID: 'th', translatorID: 'th' },
	{ flagID: 'tr', translatorID: 'tr' },
	{ flagID: 'ua', translatorID: 'uk' },
	{ flagID: 'vn', translatorID: 'vi' }
];

const flagBaseURL = 'https://raw.githubusercontent.com/lipis/flag-icon-css/master/flags/4x3/';
const translatorBaseURL = 'https://api.cognitive.microsofttranslator.com';

interface IndexProps {
	greeting: string;
	flag: string;
}

function IndexPage(props: IndexProps): React.ReactElement {
	// convert svg string to base64 dataUri
	const base64FlagSVG = Buffer.from(props.flag).toString('base64');
	const flagSVGDataUri = `data:image/svg+xml;base64,${base64FlagSVG}`;

	return (
		<div className='h-screen w-screen bg-indigo-200 flex items-center justify-center flex-col gap-12'>
			<h1 className='lg:text-title md:text-7xl text-5xl'>{props.greeting}</h1>
			<div className='w-48 md:w-56 lg:w-64'>
				<img src={flagSVGDataUri} alt='flag' />
			</div>
		</div>
	);
}

function getRandomIndex(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

export async function getServerSideProps(): Promise<{ props: IndexProps }> {
	const index = getRandomIndex(0, AVAIABLE_LANG.length);
	const { flagID, translatorID } = AVAIABLE_LANG[index];

	let greeting;
	try {
		const translateResponse = await axios({
			baseURL: translatorBaseURL,
			url: '/translate',
			method: 'post',
			headers: {
				'Ocp-Apim-Subscription-Key': process.env.API_KEY,
				'Ocp-Apim-Subscription-Region': process.env.API_LOC,
				'Content-type': 'application/json'
			},
			params: {
				'api-version': '3.0',
				from: 'de',
				to: translatorID
			},
			data: [
				{
					text: DEFAULT_GREETING
				}
			],
			responseType: 'json'
		});

		greeting = translateResponse.data[0].translations[0].text as string;
	} catch (error) {
		return {
			props: {
				greeting: DEFAULT_GREETING,
				flag: DEFAULT_FLAG
			}
		};
	}

	const flagResponse = await axios({
		baseURL: flagBaseURL,
		url: `/${flagID}.svg`,
		responseType: 'text'
	});

	const flag = flagResponse.data;

	return {
		props: {
			greeting,
			flag
		} // will be passed to the page component as props
	};
}

export default IndexPage;
