// texts of the REC chip and its notes; kept here instead of the SDK i18n so the first import stays small

const en = {
	chipTitle: 'Debug recording is on. Click for options.',
	title: 'Debug recording',
	recordingOn: 'Recording is on.',
	summary: '{count} events since {since}.',
	download: 'Download archive',
	stop: 'Stop and delete data…',
	confirm:
		'Recording stops in every Webitel app and everything recorded is deleted. This cannot be undone. Download the archive first if support needs it.',
	confirmDelete: 'Delete and stop',
	cancel: 'Cancel',
	preparing: 'Preparing archive…',
	deleting: 'Deleting…',
	failed: 'Failed. Try again, or use webitelDebug in the console.',
	stopped: 'Debug recording stopped, recorded data deleted.',
	signInToDownload:
		'Sign in as the user who recorded this to download the archive.',
};

type Texts = typeof en;

const uk: Texts = {
	chipTitle: 'Іде запис для дебагу. Натисніть, щоб побачити дії.',
	title: 'Запис для дебагу',
	recordingOn: 'Запис увімкнено.',
	summary: 'Подій: {count}, з {since}.',
	download: 'Завантажити архів',
	stop: 'Зупинити й видалити дані…',
	confirm:
		'Запис зупиниться в усіх застосунках Webitel, а все записане буде видалено. Цю дію не можна скасувати. Якщо архів потрібен підтримці, спершу завантажте його.',
	confirmDelete: 'Видалити й зупинити',
	cancel: 'Скасувати',
	preparing: 'Готуємо архів…',
	deleting: 'Видаляємо…',
	failed:
		'Не вдалося. Спробуйте ще раз або скористайтеся webitelDebug у консолі.',
	stopped: 'Запис для дебагу зупинено, записані дані видалено.',
	signInToDownload:
		'Щоб завантажити архів, увійдіть як користувач, під яким велися записи.',
};

const ru: Texts = {
	chipTitle: 'Идёт запись для отладки. Нажмите, чтобы увидеть действия.',
	title: 'Запись для отладки',
	recordingOn: 'Запись включена.',
	summary: 'Событий: {count}, с {since}.',
	download: 'Скачать архив',
	stop: 'Остановить и удалить данные…',
	confirm:
		'Запись остановится во всех приложениях Webitel, а всё записанное будет удалено. Это действие нельзя отменить. Если архив нужен поддержке, сначала скачайте его.',
	confirmDelete: 'Удалить и остановить',
	cancel: 'Отмена',
	preparing: 'Готовим архив…',
	deleting: 'Удаляем…',
	failed:
		'Не удалось. Попробуйте ещё раз или воспользуйтесь webitelDebug в консоли.',
	stopped: 'Запись для отладки остановлена, записанные данные удалены.',
	signInToDownload:
		'Чтобы скачать архив, войдите как пользователь, под которым велась запись.',
};

const es: Texts = {
	chipTitle:
		'La grabación de depuración está activada. Haga clic para ver las opciones.',
	title: 'Grabación de depuración',
	recordingOn: 'La grabación está activada.',
	summary: '{count} eventos desde {since}.',
	download: 'Descargar archivo',
	stop: 'Detener y eliminar datos…',
	confirm:
		'La grabación se detiene en todas las aplicaciones de Webitel y se elimina todo lo grabado. Esta acción no se puede deshacer. Si el soporte necesita el archivo, descárguelo primero.',
	confirmDelete: 'Eliminar y detener',
	cancel: 'Cancelar',
	preparing: 'Preparando el archivo…',
	deleting: 'Eliminando…',
	failed: 'Error. Inténtelo de nuevo o use webitelDebug en la consola.',
	stopped: 'Grabación de depuración detenida, datos grabados eliminados.',
	signInToDownload:
		'Inicie sesión con el usuario que hizo la grabación para descargar el archivo.',
};

const kz: Texts = {
	chipTitle:
		'Ақауларды іздеуге арналған жазба жүріп жатыр. Әрекеттерді көру үшін басыңыз.',
	title: 'Ақауларды іздеуге арналған жазба',
	recordingOn: 'Жазба қосулы.',
	summary: 'Оқиғалар: {count}, {since} бастап.',
	download: 'Мұрағатты жүктеп алу',
	stop: 'Тоқтату және деректерді жою…',
	confirm:
		'Жазба Webitel-дің барлық қолданбаларында тоқтайды, ал барлық жазылған деректер жойылады. Бұл әрекетті болдырмау мүмкін емес. Егер мұрағат қолдау қызметіне қажет болса, алдымен оны жүктеп алыңыз.',
	confirmDelete: 'Жою және тоқтату',
	cancel: 'Болдырмау',
	preparing: 'Мұрағат дайындалуда…',
	deleting: 'Жойылуда…',
	failed:
		'Сәтсіз аяқталды. Қайталап көріңіз немесе консольдегі webitelDebug-ті пайдаланыңыз.',
	stopped:
		'Ақауларды іздеуге арналған жазба тоқтатылды, жазылған деректер жойылды.',
	signInToDownload:
		'Мұрағатты жүктеп алу үшін жазба жүргізілген пайдаланушы ретінде кіріңіз.',
};

const pl: Texts = {
	chipTitle:
		'Nagrywanie do debugowania jest włączone. Kliknij, aby zobaczyć opcje.',
	title: 'Nagrywanie do debugowania',
	recordingOn: 'Nagrywanie jest włączone.',
	summary: 'Zdarzenia: {count}, od {since}.',
	download: 'Pobierz archiwum',
	stop: 'Zatrzymaj i usuń dane…',
	confirm:
		'Nagrywanie zostanie zatrzymane we wszystkich aplikacjach Webitel, a wszystkie nagrane dane zostaną usunięte. Tej operacji nie można cofnąć. Jeśli archiwum jest potrzebne pomocy technicznej, najpierw je pobierz.',
	confirmDelete: 'Usuń i zatrzymaj',
	cancel: 'Anuluj',
	preparing: 'Przygotowywanie archiwum…',
	deleting: 'Usuwanie…',
	failed: 'Nie udało się. Spróbuj ponownie lub użyj webitelDebug w konsoli.',
	stopped: 'Nagrywanie do debugowania zatrzymane, nagrane dane usunięte.',
	signInToDownload:
		'Aby pobrać archiwum, zaloguj się jako użytkownik, który nagrywał.',
};

const ro: Texts = {
	chipTitle:
		'Înregistrarea pentru depanare este activă. Faceți clic pentru opțiuni.',
	title: 'Înregistrare pentru depanare',
	recordingOn: 'Înregistrarea este activă.',
	summary: '{count} evenimente din {since}.',
	download: 'Descarcă arhiva',
	stop: 'Oprește și șterge datele…',
	confirm:
		'Înregistrarea se oprește în toate aplicațiile Webitel și tot ce s-a înregistrat este șters. Această acțiune nu poate fi anulată. Dacă echipa de suport are nevoie de arhivă, descărcați-o mai întâi.',
	confirmDelete: 'Șterge și oprește',
	cancel: 'Anulează',
	preparing: 'Se pregătește arhiva…',
	deleting: 'Se șterge…',
	failed:
		'Nu a reușit. Încercați din nou sau folosiți webitelDebug în consolă.',
	stopped:
		'Înregistrarea pentru depanare a fost oprită, datele înregistrate au fost șterse.',
	signInToDownload:
		'Pentru a descărca arhiva, conectați-vă ca utilizatorul care a făcut înregistrarea.',
};

const uz: Texts = {
	chipTitle:
		"Nosozliklarni tuzatish uchun yozib olish yoqilgan. Amallarni ko'rish uchun bosing.",
	title: 'Nosozliklarni tuzatish uchun yozib olish',
	recordingOn: 'Yozib olish yoqilgan.',
	summary: 'Hodisalar: {count}, {since} dan beri.',
	download: 'Arxivni yuklab olish',
	stop: "To'xtatish va ma'lumotlarni o'chirish…",
	confirm:
		"Yozib olish barcha Webitel ilovalarida to'xtaydi va yozilgan hamma narsa o'chiriladi. Bu amalni bekor qilib bo'lmaydi. Agar arxiv qo'llab-quvvatlash xizmatiga kerak bo'lsa, avval uni yuklab oling.",
	confirmDelete: "O'chirish va to'xtatish",
	cancel: 'Bekor qilish',
	preparing: 'Arxiv tayyorlanmoqda…',
	deleting: "O'chirilmoqda…",
	failed:
		"Bajarilmadi. Qayta urinib ko'ring yoki konsoldagi webitelDebug dan foydalaning.",
	stopped:
		"Nosozliklarni tuzatish uchun yozib olish to'xtatildi, yozilgan ma'lumotlar o'chirildi.",
	signInToDownload:
		'Arxivni yuklab olish uchun yozib olish olib borilgan foydalanuvchi sifatida kiring.',
};

const vi: Texts = {
	chipTitle: 'Đang ghi lại để gỡ lỗi. Nhấp để xem tùy chọn.',
	title: 'Ghi lại để gỡ lỗi',
	recordingOn: 'Đang bật ghi lại.',
	summary: '{count} sự kiện kể từ {since}.',
	download: 'Tải xuống tệp lưu trữ',
	stop: 'Dừng và xóa dữ liệu…',
	confirm:
		'Việc ghi lại sẽ dừng trong mọi ứng dụng Webitel và mọi dữ liệu đã ghi sẽ bị xóa. Không thể hoàn tác thao tác này. Nếu bộ phận hỗ trợ cần tệp lưu trữ, hãy tải xuống trước.',
	confirmDelete: 'Xóa và dừng',
	cancel: 'Hủy',
	preparing: 'Đang chuẩn bị tệp lưu trữ…',
	deleting: 'Đang xóa…',
	failed: 'Thất bại. Hãy thử lại hoặc dùng webitelDebug trong bảng điều khiển.',
	stopped: 'Đã dừng ghi lại để gỡ lỗi, dữ liệu đã ghi đã bị xóa.',
	signInToDownload:
		'Hãy đăng nhập bằng người dùng đã thực hiện ghi lại để tải xuống tệp lưu trữ.',
};

const TEXTS = {
	en,
	uk,
	ru,
	es,
	kz,
	pl,
	ro,
	uz,
	vi,
};

export type Lang = keyof typeof TEXTS;
export type TextKey = keyof Texts;

// webitel's code for Kazakh is `kz`; browsers say `kk`
const ALIASES: Record<string, Lang> = {
	kk: 'kz',
};

function readLang(): string | null {
	try {
		return localStorage.getItem('lang');
	} catch {
		return null;
	}
}

/** the app's language (`localStorage.lang`, as every webitel app keeps it), else the page's or browser's, else English */
export function currentLang(): Lang {
	const candidates = [
		readLang(),
		document.documentElement.lang,
		...(navigator.languages ?? [
			navigator.language,
		]),
	];
	for (const candidate of candidates) {
		if (!candidate) continue;
		const base = candidate.toLowerCase().split('-')[0];
		const lang = ALIASES[base] ?? base;
		if (lang in TEXTS) return lang as Lang;
	}
	return 'en';
}

/** BCP 47 tag for date and number formatting */
export function currentLocaleTag(): string {
	const lang = currentLang();
	return lang === 'kz' ? 'kk' : lang;
}

export function t(
	key: TextKey,
	params: Record<string, string | number> = {},
): string {
	const text = TEXTS[currentLang()][key] ?? en[key];
	return text.replace(/\{(\w+)\}/g, (match, name: string) =>
		name in params ? String(params[name]) : match,
	);
}
