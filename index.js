var $egdSw$reactjsxruntime = require("react/jsx-runtime");
var $egdSw$react = require("react");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $d491f4dbe5d404b8$export$2e2bcd8739ae039);



const $2809fd9f830a9b4b$var$ARROW_KEY_DOWN = 'ArrowDown';
const $2809fd9f830a9b4b$var$ARROW_KEY_UP = 'ArrowUp';
const $2809fd9f830a9b4b$var$ENTER = 'Enter';
let $2809fd9f830a9b4b$var$SiblingType;
(function(SiblingType) {
    SiblingType["NEXT"] = 'nextElementSibling';
    SiblingType["PREVIOUS"] = 'previousElementSibling';
})($2809fd9f830a9b4b$var$SiblingType || ($2809fd9f830a9b4b$var$SiblingType = {
}));
let $2809fd9f830a9b4b$var$ResultType;
(function(ResultType) {
    ResultType["FIRST"] = 'first';
    ResultType["LAST"] = 'last';
})($2809fd9f830a9b4b$var$ResultType || ($2809fd9f830a9b4b$var$ResultType = {
}));
const $2809fd9f830a9b4b$export$95d47b326af0d4f0 = ()=>{
    const inputSearchRef = ($parcel$interopDefault($egdSw$react)).useRef(null);
    const searchSuggestionsRef = ($parcel$interopDefault($egdSw$react)).useRef(null);
    const selectElement = (type)=>{
        searchSuggestionsRef.current?.querySelector(`li:${type}-of-type`)?.firstChild?.focus();
    };
    const hasFocus = ()=>searchSuggestionsRef.current?.querySelector('li a:focus')
    ;
    const selectInitialResult = (e)=>{
        if (e.currentTarget.value && !hasFocus() && [
            $2809fd9f830a9b4b$var$ARROW_KEY_DOWN,
            $2809fd9f830a9b4b$var$ARROW_KEY_UP
        ].includes(e.key)) {
            e.preventDefault();
            if (e.key === $2809fd9f830a9b4b$var$ARROW_KEY_DOWN) selectElement($2809fd9f830a9b4b$var$ResultType.FIRST);
            if (e.key === $2809fd9f830a9b4b$var$ARROW_KEY_UP) selectElement($2809fd9f830a9b4b$var$ResultType.LAST);
        }
    };
    const onResultsHover = (e)=>{
        e?.currentTarget?.firstChild?.focus();
    };
    const selectSiblingType = (e, type)=>{
        e.preventDefault();
        const resultType = e.currentTarget?.[type]?.firstChild;
        if (resultType) resultType.focus();
        else if (type === $2809fd9f830a9b4b$var$SiblingType.NEXT) selectElement($2809fd9f830a9b4b$var$ResultType.FIRST);
        else selectElement($2809fd9f830a9b4b$var$ResultType.LAST);
    };
    const selectResult = (e, type)=>{
        selectSiblingType(e, type);
    };
    const onResultsKeyDown = (e)=>{
        if (e.key === $2809fd9f830a9b4b$var$ARROW_KEY_DOWN) selectResult(e, $2809fd9f830a9b4b$var$SiblingType.NEXT);
        else if (e.key === $2809fd9f830a9b4b$var$ARROW_KEY_UP) selectResult(e, $2809fd9f830a9b4b$var$SiblingType.PREVIOUS);
        else if (e.key !== $2809fd9f830a9b4b$var$ENTER) inputSearchRef.current?.focus();
    };
    return {
        inputSearchRef: inputSearchRef,
        searchSuggestionsRef: searchSuggestionsRef,
        selectInitialResult: selectInitialResult,
        onResultsHover: onResultsHover,
        onResultsKeyDown: onResultsKeyDown
    };
};


const $d491f4dbe5d404b8$var$cssClass = `search-suggestions-${btoa('css-search-suggestions').replaceAll('=', '')}`;
const $d491f4dbe5d404b8$var$baseStyles = `
  .${$d491f4dbe5d404b8$var$cssClass} {
    position: relative;
  }

  .${$d491f4dbe5d404b8$var$cssClass} ul {
    box-sizing: border-box;
    position: absolute;
    top: calc(100% - 1px);
    width: 100%;
    border-top: 0;
    font-size: 1rem;
    list-style-type: none;
    overflow-y: auto;
  }

  .${$d491f4dbe5d404b8$var$cssClass} ul li a {
    display: block;
    text-decoration: none;
  }

  .${$d491f4dbe5d404b8$var$cssClass} ul li a:focus {
    border: 0;
    boxShadow: 0;
    font-weight: bold;
    outline: 0;
  }
`;
const $d491f4dbe5d404b8$var$SearchSuggestions = ({ suggestions: suggestions , name: name = 'q' , placeholder: placeholder = 'Search' , autoFocus: autoFocus = false , className: className = '' , onChange: onChange  })=>{
    const [results, setResults] = $egdSw$react.useState(suggestions);
    const { inputSearchRef: inputSearchRef , searchSuggestionsRef: searchSuggestionsRef , selectInitialResult: selectInitialResult , onResultsHover: onResultsHover , onResultsKeyDown: onResultsKeyDown ,  } = $2809fd9f830a9b4b$export$95d47b326af0d4f0();
    const filterSuggestions = (e)=>setResults(suggestions.filter((suggestion)=>suggestion.label.toLowerCase().includes(e.target.value || '')
        ))
    ;
    return(/*#__PURE__*/ $egdSw$reactjsxruntime.jsxs($egdSw$reactjsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ $egdSw$reactjsxruntime.jsx("style", {
                dangerouslySetInnerHTML: {
                    __html: $d491f4dbe5d404b8$var$baseStyles
                }
            }),
            /*#__PURE__*/ $egdSw$reactjsxruntime.jsxs("div", {
                className: [
                    $d491f4dbe5d404b8$var$cssClass,
                    className
                ].join(' '),
                children: [
                    /*#__PURE__*/ $egdSw$reactjsxruntime.jsx("input", {
                        ref: inputSearchRef,
                        type: "search",
                        name: name,
                        placeholder: placeholder,
                        autoFocus: autoFocus,
                        onChange: (e)=>{
                            if (onChange) onChange(e);
                            filterSuggestions(e);
                        },
                        onKeyDown: selectInitialResult,
                        spellCheck: false,
                        autoComplete: "off",
                        autoCapitalize: "off"
                    }),
                    inputSearchRef.current && inputSearchRef.current.value.length > 0 && results.length > 0 && /*#__PURE__*/ $egdSw$reactjsxruntime.jsx("ul", {
                        ref: searchSuggestionsRef,
                        children: results.map((suggestion)=>/*#__PURE__*/ $egdSw$reactjsxruntime.jsx("li", {
                                onMouseOver: onResultsHover,
                                onKeyDown: onResultsKeyDown,
                                children: /*#__PURE__*/ $egdSw$reactjsxruntime.jsx("a", {
                                    href: suggestion.url,
                                    children: suggestion.label
                                })
                            }, suggestion.label)
                        )
                    })
                ]
            })
        ]
    }));
};
var $d491f4dbe5d404b8$export$2e2bcd8739ae039 = $d491f4dbe5d404b8$var$SearchSuggestions;


