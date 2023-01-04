import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { DiskHealthIndicator, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus'
import { HealthIndicatorResult } from '@nestjs/terminus/dist/health-indicator'
import si from 'systeminformation'
import { Response } from '../../app/decorators'
import { AppGetHealthOutput } from './dtos'
import { SWAGGER_OPTIONS } from '../../common'

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private health: HealthCheckService, private readonly disk: DiskHealthIndicator, private readonly memory: MemoryHealthIndicator) {}

  @Get()
  @ApiOkResponse(SWAGGER_OPTIONS.app.healthCheckOk)
  @Response({ dto: AppGetHealthOutput })
  async getHealthCheck(): Promise<AppGetHealthOutput> {
    // TODO: Add more health check and move logic to service, exp: DB
    const details = await this.health.check([
      (): Promise<HealthIndicatorResult> => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      (): Promise<HealthIndicatorResult> => this.disk.checkStorage('storage', { path: '/', threshold: 250 * 1024 * 1024 * 1024 }),
    ])

    const cpu = await si.cpu()
    const disk = (await si.diskLayout())[0]
    const os = await si.osInfo()
    const versions = await si.versions()
    const ram = await si.mem()

    const cpuInfo = `${cpu.manufacturer} ${cpu.brand} ${cpu.speed}GHz`
    const cores = `${cpu.cores} (${cpu.physicalCores} Physical)`

    const totalRam = Math.round(ram.total / 1024 / 1024 / 1024)
    const ramInfo = `${totalRam}GB`

    const size = Math.round(disk.size / 1024 / 1024 / 1024)
    const diskSize = `${disk.vendor} ${disk.name} ${size}GB ${disk.type} (${disk.interfaceType})`

    const osInfo = `${os.distro} ${os.codename} (${os.platform})`
    const kernelInfo = `${os.kernel} ${os.arch}`

    const nodeInfo = `v${versions.node}`
    const v8 = `${versions.v8}`

    return {
      ...details,
      v8,
      cores,
      cpu: cpuInfo,
      ram: ramInfo,
      disk: diskSize,
      os: osInfo,
      kernel: kernelInfo,
      node: nodeInfo,
      date: new Date().toISOString(),
    } as any
  }
}
