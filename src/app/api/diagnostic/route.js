import { NextResponse } from 'next/server';

export async function GET(req) {
  const results = {
    step1_basic: false,
    step2_prisma_import: false,
    step3_prisma_client: false,
    step4_database_connect: false,
    step5_query_test: false,
    errors: [],
  };

  try {
    // Step 1: Basic functionality
    results.step1_basic = true;

    // Step 2: Try to import Prisma
    try {
      const { PrismaClient } = await import('@prisma/client');
      results.step2_prisma_import = true;

      // Step 3: Try to create Prisma client
      try {
        const testClient = new PrismaClient();
        results.step3_prisma_client = true;

        // Step 4: Try to connect to database
        try {
          await testClient.$connect();
          results.step4_database_connect = true;

          // Step 5: Try a simple query
          try {
            const testQuery = await testClient.$queryRaw`SELECT 1 as test`;
            results.step5_query_test = true;
          } catch (queryError) {
            results.errors.push(`Query test failed: ${queryError.message}`);
          }

          await testClient.$disconnect();
        } catch (connectError) {
          results.errors.push(
            `Database connection failed: ${connectError.message}`
          );
        }
      } catch (clientError) {
        results.errors.push(
          `Prisma client creation failed: ${clientError.message}`
        );
      }
    } catch (importError) {
      results.errors.push(`Prisma import failed: ${importError.message}`);
    }

    return NextResponse.json({
      success: results.step5_query_test,
      results,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not Set',
      },
    });
  } catch (error) {
    results.errors.push(`Diagnostic failed: ${error.message}`);
    return NextResponse.json(
      { success: false, results, error: error.message },
      { status: 500 }
    );
  }
}
