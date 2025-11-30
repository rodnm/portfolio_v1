import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image: ImageMetadata;
}

interface Props {
    projects: Project[];
    labels: {
        all: string;
        viewProject: string;
    };
}

export default function ProjectFilters({ projects, labels }: Props) {
    const [selectedTag, setSelectedTag] = useState<string>('all');

    // Extract unique tags
    const allTags = ['all', ...new Set(projects.flatMap(p => p.tags))];

    const filteredProjects = selectedTag === 'all'
        ? projects
        : projects.filter(p => p.tags.includes(selectedTag));

    return (
        <div>
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedTag === tag
                                ? 'bg-[var(--color-primary)] text-white dark:bg-[var(--color-accent)] dark:text-gray-900 shadow-lg scale-105'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        {tag === 'all' ? labels.all : tag}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <div key={project.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full animate-fade-in">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-48 overflow-hidden relative group block"
                        >
                            <img
                                src={project.image.src}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                width={project.image.width}
                                height={project.image.height}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <ExternalLink className="text-white w-8 h-8" />
                            </div>
                        </a>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm flex-grow">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:bg-[var(--color-accent)]/10 dark:text-[var(--color-accent)]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-[var(--color-secondary)] hover:underline mt-auto"
                            >
                                {labels.viewProject} <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
