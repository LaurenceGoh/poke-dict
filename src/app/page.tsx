import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Pokemon from "./components/Pokemon";
import { regionRanges } from "@/services/pokemon";

export default function Home() {
  const regions = Object.keys(regionRanges);

  return (
    <main className="flex flex-col justify-between p-12">
      <Tabs isFitted variant="enclosed">
        <TabList>
          {regions.map((region, index) => (
            <Tab key={index}>
              {`Gen ${index + 1} (${
                region.charAt(0).toUpperCase() + region.slice(1)
              })`}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {regions.map((region, index) => (
            <TabPanel key={index}>
              <Pokemon region={region} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </main>
  );
}
