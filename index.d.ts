type Props = {
    suggestions: Suggestion[];
    className?: string;
    name?: string;
    placeholder?: string;
    autoFocus?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
type Suggestion = {
    label: string;
    url: string;
};
declare const SearchSuggestions: ({ suggestions, name, placeholder, autoFocus, className, onChange, }: Props) => JSX.Element;
export default SearchSuggestions;
