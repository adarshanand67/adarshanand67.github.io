export const sourceMap: Record<string, string> = {
    'Hero': `// components/hero-3d.tsx
export function Hero3D() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <mesh rotation={[0, Math.PI / 4, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial 
                    color="#00ff00" 
                    wireframe 
                />
            </mesh>
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}`,
    'Terminal': `// components/terminal/Terminal.tsx
export function Terminal() {
    const { lines, input, setInput } = useStore();
    
    // Command Parser
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        }
    };

    return (
        <div className="terminal-window">
             <div className="output">
                {lines.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
             </div>
             <Input 
                value={input} 
                onChange={setInput} 
                onKeyDown={handleKeyDown} 
                autoFocus 
             />
        </div>
    );
}`,
    'TechStack': `// components/home.tsx
export function TechStack() {
    return (
        <section>
            <SectionHeader title="Tech Stack" />
            
            {/* Toggle View */}
            <Toggle 
                options={['List', 'Graph']} 
                onChange={setViewMode} 
            />

            {viewMode === 'graph' ? (
                <ArchitectureViewer />
            ) : (
                <SkillGrid categories={categories} />
            )}
        </section>
    );
}`,
    'ArchitectureViewer': `// components/architecture-viewer.tsx
export function ArchitectureViewer() {
    // Interactive Graph Visualization
    return (
        <div className="canvas-container">
             <svg>
                {/* Render Nodes */}
                {nodes.map(node => (
                    <Node 
                        key={node.id} 
                        x={node.x} 
                        y={node.y}
                        onHover={() => highlight(node)}
                    />
                ))}
                
                {/* Render Connections */}
                {links.map(link => (
                    <Path d={calculatePath(link)} />
                ))}
             </svg>
        </div>
    );
}`,
    'SkillGraph': `// components/skill-graph.tsx
import ForceGraph2D from 'react-force-graph-2d';

export function SkillGraph() {
    return (
        <ForceGraph2D
            graphData={data}
            nodeColor="#00ff00"
            linkColor="rgba(0,255,0,0.2)"
            backgroundColor="#000000"
        />
    );
}` ,
    'Experience': `// components/home.tsx
export function Experience({ items }: ExperienceProps) {
    return (
         <div className="mb-4 font-mono" id="experience">
            <SectionHeader
                title="Experience"
                command="cat ~/work/history.log"
            />
            <div className="pt-4 pl-2">
                {items.map((exp, index) => (
                    <ExperienceItem key={index} data={exp} />
                ))}
            </div>
        </div>
    );
}`,
    'RecentSection': `// components/home.tsx
export function RecentSection({ title, command, items }: RecentSectionProps) {
    return (
        <section className="font-mono group/section">
             <div className="w-full text-left group">
                <h2 className="text-xl font-bold">
                    <span className="text-primary">##</span> {title}
                </h2>
            </div>
            <div className="space-y-2 glass p-4 rounded-xl">
                 {items.map((item, index) => (
                    <div key={index} className="border-l-2 pl-4">
                        <Link href={item.url}>{item.title}</Link>
                    </div>
                 ))}
            </div>
        </section>
    );
}`,
    'ShelvesSection': `// components/home.tsx
export function ShelvesSection() {
    return (
        <div className="section max-w-4xl mx-auto px-4 mb-8">
             <SectionHeader 
                title="Directories" 
                command="tree -d -L 1 ~" 
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
                {shelves.map((shelf) => (
                    <Link href={shelf.path}>
                        <shelf.icon size={20} />
                        <div>{shelf.name}/</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}`,
    'UniversalShelf': `// components/shelves.tsx
export function UniversalShelf({ config, items }: UniversalShelfProps) {
    const strategy = ShelfStrategyFactory.getStrategy(config.type);
    
    return (
        <div className="section">
             <ShelfHeader 
                title={config.title} 
                count={items.length} 
            />
            {items.length === 0 ? (
                <EmptyState />
            ) : (
                strategy.renderList(items)
            )}
        </div>
    );
}`,
    'AnimeShelf': `// components/shelves.tsx
export const AnimeShelf = ({ items }: AnimeShelfProps) => {
    return (
        <>
            <FilterBar tags={allTags} />
            
            <Section title="Anime - Watching" items={watching} />
            <Section title="Anime - Watched" items={watched} />
            
            {/* Modal */}
            {selectedItem && (
                <AnimeDetailModal item={selectedItem} />
            )}
        </>
    );
}`
};
