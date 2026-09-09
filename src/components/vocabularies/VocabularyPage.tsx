import React from "react";
import { useVocabulary } from "../../api/VocabularyAPI";
import { useVocabularyTerms } from "../../api/VocabularyAPI";
import Loader from "../Loader";
import { Box } from "@mui/material";
import NoResults from "../search/NoResults";
import VocabularyHeader from "./VocabularyHeader";
import VocabularyDefinition from "./VocabularyDefinition";
import VocabularyTerms from "./VocabularyTerms";
import ErrorPage from "../ErrorPage";
import useRouteQuery from "../../hooks/useRouteQuery";
import { LanguageProvider } from "../../context/LanguageContext";
import { useVocabularyDetailPlugins } from "../../plugin/PluginRegistry";

const VocabularyPage: React.FC = () => {
  const routeQuery = useRouteQuery();
  const vocabularyIRI = routeQuery.get("iri") ?? "";
  const { data, isLoading, isSuccess, isError } = useVocabulary(vocabularyIRI);
  const {
    isSuccess: vIsSuccess,
    isLoading: vIsLoading,
    isError: vIsError,
  } = useVocabularyTerms(vocabularyIRI);
  const plugins = useVocabularyDetailPlugins();

  if (isLoading || vIsLoading) return <Loader />;

  if (isError || !data || vIsError) return <ErrorPage />;

  if (vIsSuccess && isSuccess) {
    return (
      <LanguageProvider>
        <Box mb={2}>
          <VocabularyHeader vocabulary={data} />
          <VocabularyDefinition description={data.description} />
          <VocabularyTerms vocabularyIri={data.$id} />
        </Box>
        {plugins.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </LanguageProvider>
    );
  }
  return <NoResults />;
};

export default VocabularyPage;
