import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileIcon', standalone: true })
export class FileIconPipe implements PipeTransform {
  transform(contentType: string | undefined, isContainer?: boolean): string {
    if (isContainer) return '📁';
    if (!contentType) return '📄';
    if (contentType.startsWith('image/')) return '🖼️';
    if (contentType.startsWith('video/')) return '🎥';
    if (contentType.startsWith('audio/')) return '🎵';
    if (contentType.includes('pdf')) return '📑';
    if (contentType.includes('json') || contentType.includes('ld+json')) return '{}';
    if (contentType.includes('text/')) return '📝';
    if (contentType.includes('turtle') || contentType.includes('n-triples')) return '🔗';
    return '📄';
  }
}
