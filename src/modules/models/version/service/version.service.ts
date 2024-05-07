import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class VersionService {
  private version: string;

  constructor() {
    // Read package.json synchronously
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    this.version = packageJson.version;
  }

  getVersion(): string {
    return this.version;
  }
}
