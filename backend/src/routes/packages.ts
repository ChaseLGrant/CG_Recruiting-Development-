import { Router, Request, Response } from 'express';
import { packageService } from '../services/PackageService';

const router = Router();

/**
 * GET /api/packages
 * Get all active packages with pricing
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const packages = await packageService.getAllPackages();
    res.json({
      success: true,
      data: packages,
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch packages',
    });
  }
});

/**
 * GET /api/packages/:id
 * Get a specific package by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pkg = await packageService.getPackageById(id);

    if (!pkg) {
      return res.status(404).json({
        success: false,
        error: 'Package not found',
      });
    }

    res.json({
      success: true,
      data: pkg,
    });
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch package',
    });
  }
});

/**
 * GET /api/packages/:id/pricing
 * Get pricing for a specific package
 */
router.get('/:id/pricing', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pricing = await packageService.getPricingForPackage(id);

    res.json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    console.error('Error fetching pricing:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pricing',
    });
  }
});

export default router;
