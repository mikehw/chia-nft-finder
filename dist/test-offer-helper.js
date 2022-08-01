"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testOfferHelper = void 0;
const axios_1 = __importDefault(require("axios"));
function testOfferHelper(OFFER_HELPER_BASE_URL) {
    return __awaiter(this, void 0, void 0, function* () {
        const offer = 'offer1qqp83w76wzru6cmqvpsxygqqwc7hynr6hum6e0mnf72sn7uvvkpt68eyumkhelprk0adeg42nlelk2mpafrgx923m0l4lv9ldtfalrll5ve9d7a3sl67axm4sl5553jztas645ud4gzlhxq686zsr9wc86xylxad53egvmtlellhxumnakv8cfmelex8l83g8577e58m2vamhlahxyk9smjjcgqtde75swkc7q5w4es54rxkh73m7786r79atj062ues70e7lrlgzkhl6njv77fhw526dhred2e7us76h7d5ea7kccnd7l9ele0xz6wcqwqmhjej056jqut5l5rje9jxtv36sjtqks6n9ks6r9kcmr9kgmsz2gwatg37qcn0g8gm6q6fa5l9wt40mgcknsvykj8gt6cuk5vnjelg39847k9s7er008fm2pjmj5m08588htz40qaldnskyk24ytaxyz0ufx8cc0ckz026rlwyh8nkgg94rezz0cu002kpqeh43fn8amlw0dwxsktj9qf28umv4wjv3plme8pd44y2ua83l8fkhn44d4hyhhn2l6m767xxyk0c446edmn0lgd9qlvdqpjgm0j07qjzekw0lndqm2fmqw5s58m079cyr5ufr2ktwcmk2lnh6rf28wskvatnv3pvpavjee8hwm3hdhd0wxnzkgyfamls9fc9su06n8jat9ljcnfzx6rrjkn9rtf46hukk7hm7uqxhjl4g9vlmrl8lqwen9p0jewltfmjuymhl2ela072z706mruh70r2mwez7tcmke4lcgw0rl6decwsmlch0qcuu65h8x34ut4v0fsa9zjufwj6awlh43ma5leuc060fx537wdsn8uqwcgk5slutaq2s9gpp6zqdg5v0gvzjmfaa0wttz7dc6en7alfetksa00e3zh58a5erj07mte846en7j2p35pqtscj3ctljjekmwuanwqa3d7ps554vr7l0emlp7pmg9uhtm6yuasghjttsl8txjtutrmh8h0d8t8xcuf7kl50uklhyrzrk0zknlgghdrtdmps358zlq6lflaseg44wewng5959w5nlurx7l84smwa3r5mcyud0tf778crqqwcw5m4dpkxju';
        try {
            const result = yield axios_1.default.post('/get_offer_removals', { offer }, { baseURL: OFFER_HELPER_BASE_URL });
            return true;
        }
        catch (e) {
            console.log(`Error connecting to offer helper at host ${OFFER_HELPER_BASE_URL}: ${e.message}`);
        }
        return false;
    });
}
exports.testOfferHelper = testOfferHelper;
