import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { graphql } from "../utils/graphql";
import Nav from "../components/common/Nav";

interface SearchResult {
	title: string;
	href: string;
	description: string;
}

function Search() {
	const [searchParams] = useSearchParams();
	const [results, setResults] = useState<SearchResult[]>([]);

	const query = searchParams.get("q");

	useEffect(() => {
		// fetch("https://example.com")
		//   .then((res) => res.json())
		//   .then((data) => data);



		setResults([
			{ title: "test1", href: "https://example.com", description: "wasans!!" },
		]);
	}, []);

	return (
		<div>
			<Nav query={query ?? undefined} />
			<section className='max-w-3xl mx-auto flex'>
				<motion.h2
					className='text-xl text-black/70 font-semibold font-display text-center leading-8'
					layoutId='subtitle'
				>
					"{query}"에 대한 검색 결과 ({results.length}건)
				</motion.h2>
			</section>
		</div>
	);
}

export default Search;
